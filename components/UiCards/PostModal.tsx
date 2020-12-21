import React, { useState } from "react";

interface PostModalProps {
	closeCard: VoidFunction;
}

export default function PostModal({ closeCard }: PostModalProps) {
	let [postFile, setPostFile] = useState(() => "");

	const loadPostFile = (fileUploadEvent) => {
		setPostFile(() => URL.createObjectURL(fileUploadEvent.target.files[0]));
	};

	return (
		<div className="post-modal-container">
			<div className="post-modal">
				<div className="close-icon-container">
					<button
						className="light-icon-button close-icon"
						onClick={() => closeCard()}
					>
						<span className="small-icon bi-x"></span>
					</button>
				</div>
				<div className="modal-body">
					<form className="modal-form">
						<div className="file-input-control">
							<input
								type="file"
								name="file-upload"
								id="file-upload"
								accept="image/,.png,.jpg,.webp"
								onChange={(uploadEvent) => loadPostFile(uploadEvent)}
							/>
							{postFile.length === 0 ? (
								<React.Fragment>
									<label htmlFor="file-upload" className="file-upload-label">
										<p className="upload-button psb">
											<span className="bi-camera-fill"></span>
										</p>
									</label>

									<p className="psm select-text">
										Click icon to choose a photo
									</p>
								</React.Fragment>
							) : (
								<React.Fragment>
									<label htmlFor="file-upload" className="file-upload-label">
										<img src={postFile} alt="post" className="post-image" />
									</label>

									<p className="psm select-text">
										Click the photo to change it
									</p>
								</React.Fragment>
							)}
						</div>

						<div className="textarea-control">
							<textarea
								name="post caption"
								placeholder="Caption"
								rows={2}
							></textarea>
						</div>

						<button className="primary-button psm post-button">Post</button>
					</form>
				</div>
			</div>
		</div>
	);
}
