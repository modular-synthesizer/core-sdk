/**
 * This represents an asynchronous query successfully returning a result in its data field.
 */
export type AsyncSuccess<Entity> = { ok: true; data: Entity };

/**
 * This represents an asynchronous query failing to get data and representing the error.
 */
export type AsyncFailure = { ok: false; key: string; message: string };

/**
 * This represents any result of an asynchronous query, successful or not.
 */
export type AsyncResult<Entity> = AsyncSuccess<Entity> | AsyncFailure;

/**
 * This represents a query being made with an asynchrnous mecanism. It wraps results in a promise.
 */
export type ExpectedResult<Entity> = Promise<AsyncResult<Entity>>;

/**
 * We limit HTTP verbs to a given subset of verbs to avoid typos when creating APIs.
 */
export type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

/**
 * A standard payload is just a collection of any item indexed by string keys.
 */
export type Payload<Entity> = Record<string, Entity>;

/**
 * An HTTP payload used to create querystrings only contains strings as values.
 */
export type HttpPayload = Payload<string | number>;

export type HttpParams = Payload<string>

/**
 * A fetcher is a function able to make requests on a route and returning the result wrapped as a generic type.
 */
export type Fetcher<Entity> = (
  method: HttpVerb,
  url: string,
  parameters?: HttpPayload,
  body?: HttpPayload,
) => ExpectedResult<Entity>;

/**
 * The simplest authentication type used to get the auth token on the corresponding composable.
 */
export type Auth = { token: string };

/**
 * Syntaxic sugar to avoid remaking the same type everywhere
 */
export type Eventual<Entity> = Promise<Entity | undefined>;
