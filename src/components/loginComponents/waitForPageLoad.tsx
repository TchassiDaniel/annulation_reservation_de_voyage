export default function WaitForPageLoad () {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
            <div className="flex flex-col space-y-3 justify-center items-center border-2 rounded w-[300px] h-[200px] bg-gray-100 relative transition-all duration-300 ">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-reservation-color border-solid border-opacity-70 mb-8"></div>
                    <p className="text-reservation-color text-md font-bold"> Please wait a moment ...</p>
            </div>
        </div>
    );
};