export const mockJobObject: any = {
  singleJobMock: {
    isRecurring: false,
    time: '22-11 22:34',
    cron: {
      isSequential: false,
      repeatSequence: '66-77 22:03',
    },
    payload: {
      queueName: 'routesQueue',
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  repeatableJobMock: {
    isRecurring: true,
    time: '22-11 22:34',
    cron: {
      isSequential: false,
      repeatTime: '22-11 22:34',
      repeatSequence: '66-77 22:03',
    },
    payload: {
      queueName: 'routesQueue',
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  sequentialJobMock: {
    isRecurring: true,
    time: '22-11 22:34',
    cron: {
      isSequential: true,
      repeatTime: '22-11 22:34',
      repeatSequence: '77 22:03',
    },
    payload: {
      queueName: 'routesQueue',
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  noReccurringMock: {
    time: '22-11 22:34',
    cron: {
      isSequential: false,
      repeatSequence: '66-77 22:03',
    },
    payload: {
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  isReccurringFalse: {
    isRecurring: false,
    cron: {
      isSequential: false,
      repeatSequence: '66-77 22:03',
    },
    payload: {
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  isReccurringTrue: {
    isRecurring: true,
    payload: {
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
  wrongFormatTime: {
    isRecurring: false,
    time: '22 22:13',
    cron: {
      isSequential: false,
      repeatSequence: '66-77 22:03',
    },
    payload: {
      callbackUrl: 'http://localhost:5000/api/v1/handleJobs',
      data: {
        key: 'ROUTE_TAKE_OFF_ALERT',
        args: {
          routBatchId: 1,
        },
      },
    },
  },
};
