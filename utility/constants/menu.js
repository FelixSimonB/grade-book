export const MENU = {
    pages: [
        {
            title: 'Home',
            url: '/',
            loginRequired: false
        },
        {
            title: 'My Students',
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

export const HEADERS = {
    students: [
        {
            title: 'Last Name'
        },
        {
            title: 'First Name'
        },
        {
            title: 'Q1 Average'
        },
        {
            title: 'Q2 Average'
        },
        {
            title: 'Q3 Average'
        },
        {
            title: 'Q4 Average'
        },
        {
            title: 'Final Average'
        },
        {
            title: 'Actions'
        }
    ],
    grades: [
        {
            title: 'Last Name'
        },
        {
            title: 'First Name'
        },
        {
            title: 'Homework Grades'
        },
        {
            title: 'Test Grades'
        },
        {
            title: 'Average'
        },
        {
            title: 'Actions'
        }
    ]
}

export const LOGO = {
    originBg: "/assets/logo/gb_logo.png",
    captionBg: "/assets/logo/gb_logo_caption.png",
    origin: "/assets/logo/gb_logo_nobg.png",
    caption: "/assets/logo/gb_logo_caption_nobg.png"
}