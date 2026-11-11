import { NextResponse } from "next/server";
import { z } from "zod";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-error";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();

  try {
    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success) throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);

    const account = await Account.findOne({ providerAccountId });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
