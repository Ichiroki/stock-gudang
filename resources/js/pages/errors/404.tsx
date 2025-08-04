import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Error"/>
            <div className="overflow-x-hidden overflow-y-hidden">
                <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
                    <img src="/img/404logo.png" alt="" className="h-[26rem]"/>
                </div>
            </div>
        </>
    );
}
