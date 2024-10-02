import React from 'react';
import { useRouter } from 'next/navigation';
// import { useNavigate } from 'react-router-dom';

// components
import { UpdateTime } from './Recents';

// css
import './Recents.css';

// recoil
import { useSetRecoilState } from 'recoil';
import { FlowID } from '../../common/RecoilAtom/recoilReactFlowState';

export default function Template({ width, templateList }) {
	const router = useRouter();
	// const navigate = useNavigate();
	const setFlowID = useSetRecoilState(FlowID);

	function onClickTemplate(templateId) {
		setFlowID(templateId);
		router.push(`../flow/${templateId}`);
		// navigate(`../flow/${templateId}`);
	}

	return (
		<>
			{templateList &&
				templateList.length !== 0 &&
				templateList.map((template) => {
					let url = 'https://moa.rpm.kr-dv-midasit.com/rpm-wgsd-thumbnail/image.png';
					if (template.thumbnailFileUrl) {
						url = template.thumbnailFileUrl;
					}
					return (
						<div
							key={template.templateId}
							style={{
								width: `calc(${width}px - 40px)`,
								height: width,
								display: 'flex',
								justifyContent: 'cetner',
								flexDirection: 'column',
								borderRadius: '10px',
								cursor: 'pointer',
							}}
							onClick={() => onClickTemplate(template.templateId)}
						>
							<div className='recents-thumbnail'>
								<img src={url} alt='Thumbnail' style={{ width: '100%', height: '100%' }} />
							</div>
							<div className='recents-title'>{template.title}</div>
							<UpdateTime>{template.updatedAt}</UpdateTime>
						</div>
					);
				})}
		</>
	);
}
