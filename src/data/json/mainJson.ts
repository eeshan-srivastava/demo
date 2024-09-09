const rides = {
    data: {
        rides: [
            {
                id: '1',
                name: 'Corkscrew',
                image: 'https://i.ibb.co/sqFFVQp/img-1.png',
                ticketPricing: {
                    value: 15,
                    text: '$15.00',
                },
            },
            {
                id: '2',
                name: 'Gate Keeper',
                image: 'https://i.ibb.co/LZFrKKj/img-2.png',
                ticketPricing: {
                    value: 20,
                    text: '$20.00',
                },
            },
            {
                id: '3',
                name: 'Gemini',
                image: 'https://i.ibb.co/tcSmNq5/img-3.png',
                ticketPricing: {
                    value: 10,
                    text: '$10.00',
                },
            },
            {
                id: '4',
                name: 'Meveric',
                image: 'https://i.ibb.co/k6tBGJm/img-4.png',
                ticketPricing: {
                    value: 5,
                    text: '$5.00',
                },
            },
        ],
        currency: {
            symbol: '$',
        },
    },
};

const paymentSuccess = {
    data: {
        paymentStatus: 'success',
    },
};

const paymentFailed = {
    data: {
        paymentStatus: 'failed',
    },
};

export default {
    rides,
    paymentSuccess,
    paymentFailed,
};
