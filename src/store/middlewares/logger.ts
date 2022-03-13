import { Middleware } from 'redux';

export const loggerMiddleware: Middleware =
  (store) => (next) => (action) => {
    let result;
    let error: Error | null = null;

    const previousState = store.getState();
    const startTime = Date.now();

    try {
      result = next(action);
      if (result.error) error = result.error;
    } catch (e) {
      error = e as Error;
    }

    const executionTime = Date.now() - startTime;
    const nextState = store.getState();

    if (error) {
      console.group(
        `%cFAILED: ${action.type} \n%cExecuted in: ${executionTime}ms`,
        'color: #ED7575',
        'color: #ED7575; font-weight: 400; margin: 0 auto'
      );
    } else {
      console.groupCollapsed(
        `%c${action.type} \n%cExecuted in: ${executionTime}ms`,
        'color: #eee',
        'color: #aaa; font-weight: 400; margin: 0 auto'
      );
    }

    // Previous state
    console.groupCollapsed('%cprevious', 'color: #2DED83');
    console.log(previousState);
    console.groupEnd();
    // Action
    console.groupCollapsed('%caction', 'color: #ED872D');
    console.log(action);
    console.groupEnd();

    if (error) {
      // Error
      console.group('%cerror', 'color: #FF0800');
      console.log(error);
      console.groupEnd();
    } else {
      // Next state
      console.groupCollapsed('%cnext', 'color: #2DED83');
      console.log(nextState);
      console.groupEnd();
    }

    console.groupEnd();

    return result;
  };
