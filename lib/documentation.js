let config = {
    x_align: 'right',
    y_align: 'top',
    duration: 5000,
    font: {
        size: 15,
        weight: 900,
        family: 'arlon'
    },
    custom_colors: {
        success: {
            bg: '#0C7059',
            color: '#E0BC29',
            border: {
                type: '#085241',
                color: 'gray'
            },
            progress: {
                bg: '#E0BC29'
            }
        },
        /** you can also add other types configs */
    },
    radius: 20,
    bordered: true,
    border_width: 1,
    closer: true,
    progress: true,
    progress_height: 2

}
theshtify({ message: 'welcome to theshtify', type: 'success', config: config });