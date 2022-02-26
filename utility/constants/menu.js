export const MENU = {
    pages: [
        {
            title: 'Home',
            url: '/',
            loginRequired: false
        },
        {
            title: 'Students',
            url: '/students',
            loginRequired: true
        },
        {
            title: 'Grades',
            url: '/grades',
            loginRequired: true
        }
    ],
    settings: [
        {
            title: 'Profile',
            url: '/profile'
        },
        {
            title: 'Settings',
            url: '/settings'
        }
    ]
}

export const LOGO = {
    originBg: "assets/logo/gb_logo.png",
    captionBg: "assets/logo/gb_logo_caption.png",
    origin: "assets/logo/gb_logo_nobg.png",
    caption: "assets/logo/gb_logo_caption_nobg.png"
}