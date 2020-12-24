import React, { useState } from "react";
import { useReducer } from "react";
import { PostShape } from "../../lib/ts/interfaces";

interface PostModalProps {
	closeCard: VoidFunction;
	createPostAction: Function;
}

interface formAction {
	type: "IMAGE" | "CAPTION";
	payload: string;
}

interface PostFormShape {
	image: string;
	caption: string;
}

export default function PostModal({
	closeCard,
	createPostAction,
}: PostModalProps) {
	const formReducer = (
		prevState: PostFormShape,
		action: formAction
	): PostFormShape => {
		switch (action.type) {
			case "IMAGE": {
				return { ...prevState, image: action.payload };
			}

			case "CAPTION": {
				return { ...prevState, caption: action.payload };
			}
		}
		console.log(formState);
	};

	let [formState, formStateDispatch] = useReducer(formReducer, {
		image: "",
		caption: "",
	});

	const handleSubmit = (submitEvent) => {
		submitEvent.preventDefault();
		createPostAction(formState);
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
					<form
						className="modal-form"
						onSubmit={(submitEvent) => handleSubmit(submitEvent)}
					>
						<div className="file-input-control">
							<input
								type="file"
								name="file-upload"
								id="file-upload"
								accept="image/,.png,.jpg,.webp"
								onChange={(uploadEvent) =>
									formStateDispatch({
										type: "IMAGE",
										payload: URL.createObjectURL(uploadEvent.target.files[0]),
									})
								}
							/>
							{formState.image.length === 0 ? (
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
										<img
											src={formState.image}
											alt="post"
											className="post-image"
										/>
									</label>

									<p className="psm select-text">
										Click the photo to change it
									</p>
								</React.Fragment>
							)}
						</div>

						<div className="textarea-control">
							<textarea
								value={formState.caption}
								onChange={(event) =>
									formStateDispatch({
										type: "CAPTION",
										payload: event.target.value,
									})
								}
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
