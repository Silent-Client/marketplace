export function errorHandler(err: any, toast: any) {
	if (err?.response && err.response?.data && err.response.data?.errors) {
		for (const error of err.response.data.errors) {
			toast({
				title: "Error!",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	} else {
		toast({
			title: "Unknown error!",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	}
}

export function capitalize(text: string) {
	return text.replace(/\b\w/g, function (m) {
		return m.toUpperCase();
	});
}

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
