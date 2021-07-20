export const ScrollEvent = (page,setPage) => {
    const scrollToAdd = () => {
        setPage(page + 1)
    }

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            scrollToAdd()
        }
    }
}



