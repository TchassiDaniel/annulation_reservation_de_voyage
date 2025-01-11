export default  function  Loading() {

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden w-full">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-reservation-color/20">
                    <div className="w-12 h-12 rounded-full border-4 border-reservation-color border-t-transparent animate-spin absolute inset-0"></div>
                </div>
            </div>
            <div className="mt-4 text-reservation-color font-medium">
                Loading ...
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
            </div>
        </div>
    )
}
