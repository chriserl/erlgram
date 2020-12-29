import ImageKit from "imagekit";

export default async (request, response) => {
	var imagekit = new ImageKit({
		publicKey: "public_8ADQhfc02b69LM2ICJM1saHkuPw=",
		privateKey: process.env.IK_PRIVATE_KEY,
		urlEndpoint: "https://ik.imagekit.io/erldev",
	});

	var authenticationParameters = imagekit.getAuthenticationParameters();

	response.send(JSON.stringify(authenticationParameters));
};
