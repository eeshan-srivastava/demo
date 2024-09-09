interface RideItemBean {
    id: string;
    name: string;
    image: string;
    ticketPricing: {
        value: number;
        text: string;
    };
    selected: boolean;
}

export { type RideItemBean };
