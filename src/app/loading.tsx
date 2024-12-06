export default function Loading()
{
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
            <div
                className="flex flex-col space-y-3 justify-center items-center w-full h-screen border-2 rounded  bg-gray-50  relative transition-all duration-300 ">
                <div
                    className="animate-spin rounded-full h-32 w-32 border-t-8 border-reservation-color border-solid border-opacity-70 mb-8"></div>
                <p className="text-reservation-color text-3xl font-bold"> Loading ...</p>
            </div>
        </div>
    )
}