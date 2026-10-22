import { aboutPage } from "./aboutPage";
import { boardMember } from "./boardMember";
import { event } from "./event";
import { homePage } from "./homePage";
import { membershipPage } from "./membershipPage";
import { officialDocument } from "./officialDocument";
import { post } from "./post";
import { privacyPage } from "./privacyPage";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [siteSettings, homePage, aboutPage, membershipPage, privacyPage, event, post, boardMember, officialDocument];

/** Documents that exist exactly once; the Studio opens them directly. */
export const SINGLETONS = ["siteSettings", "homePage", "aboutPage", "membershipPage", "privacyPage"] as const;
