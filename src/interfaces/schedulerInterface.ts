export interface IRequestData {
  isRecurring: boolean;
  time?: string;
  cron?: {
    isSequential: boolean;
    repeatTime?: string;
    repeatSequence?: string;
  };
  timeZone?: string;
  payload: {
    queueName: string;
    callbackUrl: string;
    data: {
      key: string;
      args: {};
    };
  };
}

export interface IClientData {
  clientId: string;
  clientSecret: string;
}

export interface IJobData {
  queueName: string;
  callbackUrl: string;
  data: {
    key: string;
    args: object;
  };
  clientId: string;
}

export interface IDateData {
  day: string;
  month: string;
}

export interface ITimeData {
  hour: string;
  minute: string;
}

export interface IRequestOptions {
  url: string;
  body: {
    key: string;
    args: object;
  };
  headers: {
    scheduler_secret: string;
  };
  json: boolean;
}

export interface IQueueDetails {
  queueName: string;
}
