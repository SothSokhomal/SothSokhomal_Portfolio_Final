type LogLevel = "info" | "warn" | "error";

interface LogPayload {
  action: string;
  message: string;
  metadata?: Record<string, any>;
  error?: any;
}

export const logger = {
  info(payload: LogPayload) {
    formatLog("info", payload);
  },
  warn(payload: LogPayload) {
    formatLog("warn", payload);
  },
  error(payload: LogPayload) {
    formatLog("error", payload);
  },
};

function formatLog(level: LogLevel, payload: LogPayload) {
  const timestamp = new Date().toISOString();
  const logObj = {
    timestamp,
    level: level.toUpperCase(),
    action: payload.action,
    message: payload.message,
    metadata: payload.metadata || {},
    ...(payload.error
      ? {
          error: {
            message: payload.error.message || String(payload.error),
            stack: payload.error.stack,
          },
        }
      : {}),
  };

  if (process.env.NODE_ENV === "production") {
    console.log(JSON.stringify(logObj));
  } else {
    const colorMap = {
      info: "\x1b[36m", // Cyan
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
    };
    const reset = "\x1b[0m";
    console.log(
      `${colorMap[level]}[${logObj.level}]${reset} ${logObj.timestamp} [${logObj.action}]: ${logObj.message}`,
      logObj.metadata,
      payload.error || ""
    );
  }
}
