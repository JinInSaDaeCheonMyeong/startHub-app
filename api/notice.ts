import axios from "axios";
import {ShowToast, ToastType} from "../util/ShowToast";
import {NoticeItemType} from "../type/notice/notice.type";
import {NoticeCategory} from "../constants/NoticeCategory";

export async function notice(
    page: number,
    category: string,
    location: string,
    target : string,
    years : string,
    entre : string,
    search : string,
) : Promise<NoticeItemType[]> {
    try {
        const response = await axios.get(
            'https://nidapi.k-startup.go.kr/api/kisedKstartupService/v1/getAnnouncementInformation',
            {
                params: {
                    page: page,
                    perPage: 15,
                    'cond[supt_biz_clsfc::LIKE]': category,
                    'cond[supt_regin::LIKE]' : location,
                    'cond[aply_trgt::LIKE]' : target,
                    'cond[biz_trgt_age::LIKE]' : years,
                    'cond[biz_enyy::LIKE]' : entre,
                    'cond[biz_pbanc_nm::LIKE]' : search,
                    returnType: 'json'
                },
                paramsSerializer: params => {
                    return Object.entries(params)
                        .map(([key, value]) => `${key}=${value}`)
                        .join('&');
                },
            }
        )
        const items = response.data.data;


        const parseItems: NoticeItemType[] = items.map((item: any) => ({
            id: item.id,
            category: getCategoryFromString(item.supt_biz_clsfc),
            title: item.biz_pbanc_nm,
            startTime: parseDate(item.pbanc_rcpt_bgng_dt),
            endTime: parseDate(item.pbanc_rcpt_end_dt),
            location: item.supt_regin || "전국",
            target: item.aply_trgt || "해당없음",
            years: parseAgeRangeToDecades(item.biz_trgt_age) || undefined,
            entre: item.biz_enyy || "없음",
            webLink : item.detl_pg_url
        }));
        return parseItems.filter((item: NoticeItemType) => item.category !== undefined);
    } catch (error: any) {
        ShowToast(
            "문제가 발생하였습니다.",
            error.message,
            ToastType.ERROR
        )
        return [] ;
    }
}

function parseAgeRangeToDecades(ageStr: string): string[] {
    if (!ageStr || typeof ageStr !== 'string') {
        return [];
    }

    const result = new Set<string>();
    const parts = ageStr.split(',').map(s => s.trim());

    for (const part of parts) {
        const nums = part.match(/\d+/g)?.map(Number) || [];

        if (part.includes("미만") && nums.length === 1) {
            const upper = nums[0] - 1;
            const decade = Math.floor(upper / 10) * 10;
            result.add(`${decade}대`);
        } else if (part.includes("이상 ~") && nums.length === 2) {
            const [start, end] = nums;
            for (let age = start; age <= end; age += 10) {
                const decade = Math.floor(age / 10) * 10;
                result.add(`${decade}대`);
            }
        } else if (part.includes("이상") && nums.length === 1) {
            const start = nums[0];
            const decade = Math.floor(start / 10) * 10;
            result.add(`${decade}대`);
        }
    }

    return Array.from(result).sort((a, b) => {
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        return aNum - bNum;
    });
}


const StringToNoticeCategory: Record<string, NoticeCategory> = {
    "사업화": NoticeCategory.BUSINESS,
    "기술개발(R&amp;D)": NoticeCategory.RND,
    "시설ㆍ공간ㆍ보육": NoticeCategory.FACILITY,
    "멘토링ㆍ컨설팅ㆍ교육": NoticeCategory.EDUCATION,
    "창업교육": NoticeCategory.EDUCATION,
    "글로벌": NoticeCategory.GLOBAL,
    "인력": NoticeCategory.TALENT,
    "행사": NoticeCategory.EVENT,
    "정책자금": NoticeCategory.FUNDING,
};

export function getCategoryFromString(s: string): NoticeCategory | undefined {
    return StringToNoticeCategory[s];
}
export function parseDate(dateStr: string): Date {
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1;
    const day = parseInt(dateStr.slice(6, 8), 10);
    return new Date(year, month, day);
}
