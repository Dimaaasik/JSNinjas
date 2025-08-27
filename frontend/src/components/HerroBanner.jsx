export default function HerroBanner() {
    return (
        <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600
                        text-white py-10 px-4 text-center shadow-lg dark:from-gray-700 dark:via-gray-900 dark:to-black">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
                Superheroes Universe
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 dark:text-gray-300">
                Discover the mightiest heroes of all time
            </p>
        </div>
    );
}
