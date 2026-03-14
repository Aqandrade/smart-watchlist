export const makeUrl = (url: string, urlParams?: object): string => {
    if (urlParams) {
        const urlSearchParams = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) => {
            if (value) urlSearchParams.append(key, String(value));
        });

        return `${url}?${urlSearchParams}`;
    }

    return url;
};
