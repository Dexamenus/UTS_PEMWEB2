export default function Biodata() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-[#7A1D3A] h-32 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-md">
                        👤
                    </div>
                </div>
                <div className="pt-16 pb-8 px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Muhammad Abdan Annur</h2>
                    <p className="text-[#7A1D3A] font-medium mb-6">D4 Teknik Informatika</p>

                    <div className="space-y-4 text-left border-t pt-6">
                        <div className="flex justify-between">
                            <span className="text-gray-500">NIM</span>
                            <span className="font-semibold text-gray-800">24090104</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="font-semibold text-gray-800">abdan.annur123@gmail.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Hobi</span>
                            <span className="font-semibold text-gray-800">Coding & Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}