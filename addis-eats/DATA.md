#### Fetching using SWR

1. const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
   fallbackData: initial,
   refreshInterval: 5000,
   })

key: `/api/orders/${id}`\
refresh rule: refreshInterval: 5000\
reason: polling for status.

2.  const { data, error, isLoading } = useSWR(
    debounced || defaultCat ? key : null,
    fetcher,
    {
    fallbackData: initial,
    },
    )

key: `/api/dishes?category=${encodeURIComponent(defaultCat)}` +
`&q=${encodeURIComponent(debounced)}` +
`&page=${encodeURIComponent(pageIndex)}`\
refresh rule: default\
reason: fetch whenever category, debounced search query or page change.
