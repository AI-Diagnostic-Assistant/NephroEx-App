import HeaderAuth from "@/components/header-auth";


export default async function Index() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <HeaderAuth/>
                </div>
            </div>
        </div>


    );

}
