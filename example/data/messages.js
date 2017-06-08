module.exports = [
    {
        _id: Math.round(Math.random() * 1000000),
        text: "Yes, and I use Gifted Chat!",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 1,
            name: "Developer"
        },
        status: 0
        // location: {
        //     latitude: 48.864601,
        //     longitude: 2.398704
        // }
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "Send message !",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 1,
            name: "Developer"
        },
        status: 1
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "Oh noooooo !!!",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 1,
            name: "Developer"
        },
        status: 5
    },
    {
        _id: Math.round(Math.random() * 1000000),
        image: "https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 2,
            name: "React Native"
        },
        status: 1
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "Are you building a chat app?",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 2,
            name: "React Native"
        },
        status: 1
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "Hello world 🌎",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        status: 1
    }
];
