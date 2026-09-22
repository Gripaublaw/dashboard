/**
 * Activity list island for the Inici section.
 * Mirrors the translation dictionary: the text of each entry follows the
 * selected locale, so CA/EN switches every row here too.
 */

import { t, type TranslationKey } from "../lib/i18n.ts";
import { activities, type ActivityItem } from "../lib/data.ts";
import { StatusBadge, type StatusTone } from "../components/StatusBadge.tsx";
import { locale } from "./state.ts";

const TEMPLATES: Record<
  ActivityItem["template"],
  { ca: (actor: string, subject: string) => string; en: (actor: string, subject: string) => string }
> = {
  deployed: {
    ca: (a, s) => `${a} ha desplegat ${s}`,
    en: (a, s) => `${a} deployed ${s}`,
  },
  invited: {
    ca: (a, s) => `${a} ha convidat ${s}`,
    en: (a, s) => `${a} invited ${s}`,
  },
  connector: {
    ca: (a, s) => `${a}: el connector ${s} necessita atenció`,
    en: (a, s) => `${a}: connector ${s} needs attention`,
  },
  incident: {
    ca: (a, s) => `${a} ha resolt un incident a ${s}`,
    en: (a, s) => `${a} resolved an incident on ${s}`,
  },
  export: {
    ca: (a, s) => `${a} ha exportat ${s}`,
    en: (a, s) => `${a} exported ${s}`,
  },
  key: {
    ca: (a, s) => `${a} ha rotat la clau de ${s}`,
    en: (a, s) => `${a} rotated the key for ${s}`,
  },
  billing: {
    ca: (a, s) => `${a} ha emès la factura de ${s}`,
    en: (a, s) => `${a} issued the invoice for ${s}`,
  },
};

const KIND_TONE: Record<ActivityItem["kind"], StatusTone> = {
  success: "success",
  info: "info",
  warning: "warning",
  danger: "danger",
};

const KIND_KEY: Record<ActivityItem["kind"], TranslationKey> = {
  success: "status.active",
  info: "status.accepted",
  warning: "status.warning",
  danger: "status.error",
};

export default function ActivityList() {
  const current = locale.value;

  if (activities.length === 0) {
    return <p class="py-6 text-sm text-muted">{t(current, "home.activity.empty")}</p>;
  }

  return (
    <ol class="flex flex-col gap-1">
      {activities.map((item) => {
        const text = TEMPLATES[item.template][current](item.actor, item.subject);
        return (
          <li
            key={item.id}
            class="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 rounded-md px-2 py-3 transition-colors hover:bg-surface-2/70"
          >
            <div class="flex min-w-0 items-start gap-3">
              <span
                class={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                  item.kind === "success"
                    ? "bg-success"
                    : item.kind === "warning"
                    ? "bg-warning"
                    : item.kind === "danger"
                    ? "bg-danger"
                    : "bg-brand"
                }`}
              />
              <div class="min-w-0">
                <p class="text-sm text-body">{text}</p>
                <time datetime={item.iso} class="text-xs text-muted-2">
                  {item.at}
                </time>
              </div>
            </div>
            <StatusBadge
              label={t(current, KIND_KEY[item.kind])}
              tone={KIND_TONE[item.kind]}
            />
          </li>
        );
      })}
    </ol>
  );
}
