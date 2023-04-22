/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://94.103.87.41:8000/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API documentation
 * @version v1
 * @license MIT License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://94.103.87.41:8000/api
 * @contact <contact@yourdomain.com>
 *
 * API documentation
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  createNumParam = {
    /**
     * @description Создает новый числовой параметр
     *
     * @tags create_num_param
     * @name CreateNumParamCreate
     * @request POST:/create_num_param/
     * @secure
     */
    createNumParamCreate: (
      data: {
        /** Идентификатор параметра(если мы изменяем старый параметр) */
        param_id?: number;
        /** Название */
        name: string;
        /** Описание */
        description: string;
        /** Сокращение */
        abbreviation: string;
        /** Вид */
        kind: string;
        /** Целочисленный ли параметр (true/false) */
        is_integer: boolean;
        /** Диапазон действия ( [0;1000]) */
        active_range: string;
        /** Список привязанных соотношений (можно отправить пустой список) */
        param_calculations: {
          /** ID соотношения */
          calculation_id?: number;
        }[];
        /** ID единицы измерения */
        unit_id: number;
        /** Множитель по-умолчания */
        default_multiplier?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/create_num_param/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  createParamCalc = {
    /**
     * @description Создает новое соотношение
     *
     * @tags create_param_calc
     * @name CreateParamCalcCreate
     * @request POST:/create_param_calc/
     * @secure
     */
    createParamCalcCreate: (
      data: {
        /** ID */
        param_calculation_id?: number;
        /** Название */
        name?: string;
        /** Сокращение */
        abbreviation?: string;
        /** Исходный код */
        code?: string;
        /** Описание */
        description?: string;
        /** Диапазон действия ( [0;1000]) */
        active_range?: string;
        /** Список параметров,необохдимых для расчета */
        calc_function_params?: {
          /** ID параметра */
          param_id?: number;
          /** Название параметра */
          name?: string;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/create_param_calc/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  createParamComponent = {
    /**
     * @description Создает новые свойства выборочного параметра
     *
     * @tags create_param_component
     * @name CreateParamComponentCreate
     * @request POST:/create_param_component/
     * @secure
     */
    createParamComponentCreate: (
      data: {
        /** Ссылка на ID выборочного параметра */
        param_id?: number;
        /** ID свойства выборочного параметра(если мы редактируем старое свойство) */
        component_id?: number;
        /** Название */
        name?: string;
      }[],
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/create_param_component/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  createSampleParam = {
    /**
     * @description Создает новый выборочный параметр
     *
     * @tags create_sample_param
     * @name CreateSampleParamCreate
     * @request POST:/create_sample_param/
     * @secure
     */
    createSampleParamCreate: (
      data: {
        /** Идентификатор параметра(если мы изменяем старый параметр) */
        param_id?: number;
        /** Название */
        name?: string;
        /** Описание */
        description?: string;
        /** Сокращение */
        abbreviation?: string;
        /** Вид */
        kind?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/create_sample_param/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  createUnit = {
    /**
     * @description Создает новую единицу измерения
     *
     * @tags create_unit
     * @name CreateUnitCreate
     * @request POST:/create_unit/
     * @secure
     */
    createUnitCreate: (
      data: {
        /** Идентификатор единицы(если мы изменяем старый параметр) */
        unit_id?: number;
        /** Название */
        name?: string;
        /** Описание */
        description?: string;
        params?: {
          /** Название */
          abbreviation?: string;
          /** множитель */
          multiplier?: string;
          /** диапазон действия */
          action_range?: string;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/create_unit/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  getNumParam = {
    /**
     * @description Этот метод возвращает список параметров.
     *
     * @tags get_num_param
     * @name GetNumParamList
     * @summary Получение списка параметров
     * @request GET:/get_num_param/
     * @secure
     */
    getNumParamList: (
      query?: {
        /** Идентификатор параметра */
        param_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/get_num_param/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  getParamCalc = {
    /**
     * No description
     *
     * @tags get_param_calc
     * @name GetParamCalcList
     * @request GET:/get_param_calc/
     * @secure
     */
    getParamCalcList: (
      query?: {
        /** Идентификатор соотношения */
        calc_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/get_param_calc/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  getSampleParam = {
    /**
     * No description
     *
     * @tags get_sample_param
     * @name GetSampleParamList
     * @request GET:/get_sample_param/
     * @secure
     */
    getSampleParamList: (
      query?: {
        /** ID параметра для получения */
        param_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/get_sample_param/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  getUnits = {
    /**
     * @description Получить список единиц измерения
     *
     * @tags get_units
     * @name GetUnitsList
     * @request GET:/get_units/
     * @secure
     */
    getUnitsList: (
      query?: {
        /** Идентификатор единицы измерения */
        unit_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Идентификатор единицы измерения */
          unit_id?: number;
          /** Название */
          name?: string;
          /** Описание */
          description?: string;
          params?: {
            /** Название */
            name?: string;
            /** Множитель */
            multiplier?: string;
            /** Диапазон действия */
            action_range?: string;
          }[];
        }[],
        any
      >({
        path: `/get_units/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
