import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="w-ful flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient !test-light-900 min-h-[46px] px-4 py-3">
          <Link href={ROUTES.ASK_QUESTIONS}>Ask a Questions</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch imgSrc="/icons/search.svg" placeholder="Search questions..." otherClasses="flex-1" route="/" />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        <p>question card 1</p>
        <p>question card 2</p>
        <p>question card 3</p>
      </div>
    </>
  );
}
