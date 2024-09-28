import { RouteType } from "../../types";
import { RoutePostHealthBodyType } from "./route-post-health-body-type";
import { RoutePostHealthHeadersType } from "./route-post-health-headers-type";
import { RoutePostHealthParamsType } from "./route-post-health-params-type";
import { RoutePostHealthQueryStringType } from "./route-post-health-query-string-type";
import { RoutePostHealthReplyType } from "./route-post-health-reply-type";

export type RoutePostHealthType = RouteType<{
  readonly Body: RoutePostHealthBodyType;
  readonly Headers: RoutePostHealthHeadersType;
  readonly Params: RoutePostHealthParamsType;
  readonly Querystring: RoutePostHealthQueryStringType;
  readonly Reply: RoutePostHealthReplyType;
}>;
