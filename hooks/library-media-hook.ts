import { MediaType } from "webslider-sdk/lib/common/i-media-types";

export const useLibraryMediaHook = () => ({
  fetchLibraryMedias: (_props: {
    type: MediaType;
    from: number;
    tag?: string;
    search?: string;
    perPage?: number;
  }) => Promise.resolve({ data: [], pagination: {} as any }),
  deleteLibraryMedias: (_type: MediaType, _ids: string[]) =>
    Promise.resolve({ response: [] as any[] }),
});
