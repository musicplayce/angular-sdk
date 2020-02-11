export class CookieUtil {
    public static createCookie(
        name: string,
        value: any,
        days?: number,
        domain?: string,
        secure: boolean = true,
        sameSite: boolean = true
    ) {
        let expiresString: string = ''
        if (days) {
            let date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expiresString = '; expires=' + date.toUTCString()
        }

        let domainString: string = ''
        if (domain) {
            domainString = '; domain=' + domain
        }

        let secureString: string = ''
        if (secure) {
            secureString = '; secure'
        }

        let sameSiteString: string = ''
        if (sameSite) {
            sameSiteString = '; samesite=strict'
        }

        let pathString: string = '; path=/'

        const cookie = `${name}=${value}${expiresString}${pathString}${domainString}${secureString}${sameSiteString}`

        document.cookie = cookie
    }

    public static readCookie(name: string) {
        let nameEQ = name + '='
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    public static eraseCookie(name: string) {
        CookieUtil.createCookie(name, '', -1)
    }
}
