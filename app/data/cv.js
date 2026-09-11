/** Same-origin CV PDF paths by locale. */
export const CV_PATH_EN = "/Franco-Juarez-CV-EN.pdf";
export const CV_PATH_ES = "/Franco-Juarez-CV-ES.pdf";

/** @deprecated Use getCvPath(language) for locale-aware links. Defaults to Spanish. */
export const CV_DRIVE_URL = CV_PATH_ES;

/** @deprecated Use getCvPath(language) for locale-aware links. Defaults to Spanish. */
export const CV_LOCAL_PATH = CV_PATH_ES;

/** Legacy bookmark path; kept in sync with the Spanish CV. */
export const CV_LEGACY_PATH = "/Franco-Juarez-CV.pdf";

/**
 * Returns the same-origin CV path for the given locale.
 * @param {string} language - "en" for English, anything else for Spanish.
 */
export function getCvPath(language) {
  return language === "en" ? CV_PATH_EN : CV_PATH_ES;
}
