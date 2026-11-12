import pino from "pino";
import pretty from "pino-pretty";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

// pino's worker-thread `transport` can't resolve its target once bundled by Next, so pretty-print via a sync stream.
const stream =
  !isEdge && !isProduction
    ? pretty({
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "SYS:standard",
        sync: true,
      })
    : undefined;

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    // Date.now() is blocked during Cache Components prerendering; performance.now() is allowed for telemetry.
    timestamp: () => `,"time":"${new Date(performance.timeOrigin + performance.now()).toISOString()}"`,
  },
  stream
);

export default logger;
