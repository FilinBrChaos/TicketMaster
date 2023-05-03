import { useNavigate, useSearchParams } from 'react-router-dom';
export const RetroTabsSelector = (): JSX.Element => {
    const navigate = useNavigate();
    const [ params ] = useSearchParams();
    const currentTab = params.get('tab');
    return (
        <div className="flex flex-row w-full justify-center border-b">
            <div className="flex flex-row">
                <div className={"flex items-center justify-center w-36 h-10 cursor-pointer hover:bg-[#3b3e42] " + (currentTab === 'topics' ? '' : 'bg-[#3b3e42]')}
                    onClick={() => { navigate('?tab=notes') }}>
                    Notes
                </div>
                <div className={"flex items-center justify-center w-36 h-10 cursor-pointer hover:bg-[#3b3e42] " + (currentTab === 'topics' ? 'bg-[#3b3e42]' : '')}
                    onClick={() => { navigate('?tab=topics') }}>
                    Topics
                </div>
            </div>
        </div>
    )
}