import Checkbox from "../Checkbox/Checkbox";

const SidebarFilter = () => {

    return (
        <div className="bg-white rounded-xl px-6 py-8">
            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-5">Filter</h1>
                <Checkbox title={'Paling Baru'} id={'baru'} value = {'Paling Baru'} />
                <Checkbox title={'Paling Populer'} id={'populer'} value = {'Paling Populer'} />
                <Checkbox title={'Promo'} id={'promo'} value = {'Promo'} />
            </div>
            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-5">Kategori</h1>
                <Checkbox title={'UI/UX Design'} id={'uiux'} value = {'UI/UX Design'} />
                <Checkbox title={'Product Management'} id={'pm'} value = {'Product Management'} />
                <Checkbox title={'Web Development'} id={'webdev'} value = {'Web Development'} />
                <Checkbox title={'Android Development'} id={'android'} value = {'Android Development'} />
                <Checkbox title={'iOS Development'} id={'ios'} value = {'IOS Development'} />
                <Checkbox title={'Data Science'} id={'datasc'} value = {'Data Science'} />
                <Checkbox title={'Networking'} id={'network'} value = {'Networking'} />
                <Checkbox title={'Artificial Intelligence'} id={'ai'} value = {'Artificial Intelligence'} />
                <Checkbox title={'Cloud Computing'} id={'cloud'} value = {'Cloud Computing'} />
                <Checkbox title={'Internet of Things'} id={'iot'} value = {'Internet Of Things'} />
                <Checkbox title={'Game Development'} id={'gamedev'} value = {'Game Development'} />
                <Checkbox title={'Cyber Security'} id={'cyber'} value = {'Cyber Security'} />
            </div>
            <div className="mb-10">
                <h1 className="text-2xl font-bold mb-5">Level Kesulitan</h1>
                <Checkbox title={'Semua Level'} id={'semua'} value = {'Semua Level'} />
                <Checkbox title={'Beginner Level'} id={'beginner'} value = {'beginner'} />
                <Checkbox title={'Intermediate Level'} id={'intermediate'} value = {'intermediate'} />
                <Checkbox title={'Advanced Level'} id={'advanced'} value = {'advanced'} />
            </div>
            <hr className="mb-3"/>
            <div className="flex flex-col justify-center gap-y-4 pt-4">
                <button  id="filterButton" className="bg-SUCCESS text-white text-sm font-medium py-2 rounded-lg">Terapkan</button>
                <button  id="deleteFilter" className="bg-WARNING text-white text-sm font-medium py-2 rounded-lg">Hapus Filter</button>
            </div>
        </div>
    );
};

export default SidebarFilter;
