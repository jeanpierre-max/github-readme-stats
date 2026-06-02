// @ts-check

import axios from "axios";
import { CustomError, MissingParamError } from "../common/error.js";

// Patrón de dominio válido (host opcional con subdominios + TLD).
// Previene SSRF al impedir IPs, puertos, rutas o caracteres arbitrarios en api_domain.
const VALID_DOMAIN_REGEX =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string }} props Fetcher props.
 * @returns {Promise<import("./types").WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  // Determina el dominio de la API validando api_domain contra una whitelist de formato.
  // Si el valor proporcionado no es un dominio válido, se usa wakatime.com por defecto.
  const sanitizedDomain = api_domain
    ? api_domain.replace(/\/$/gi, "")
    : "wakatime.com";
  const domain = VALID_DOMAIN_REGEX.test(sanitizedDomain)
    ? sanitizedDomain
    : "wakatime.com";

  try {
    const { data } = await axios.get(
      `https://${domain}/api/v1/users/${encodeURIComponent(
        username,
      )}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new CustomError(
        `Could not resolve to a User with the login of '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
