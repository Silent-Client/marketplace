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

export function isPremium(user: any) {
	return (
		user?.is_plus === 1 ||
		user?.is_admin === 1 ||
		user?.is_staff === 1 ||
		user?.is_tester === 1 ||
		user?.is_partner === 1 ||
		user?.is_retired === 1 ||
		user?.is_dev === 1 ||
		user?.is_manager === 1 ||
		user?.is_senior_tester ||
		user?.is_tester_manager ||
		user?.is_jr_admin ||
		user?.is_tech_support ||
		user?.is_senior_tech_support
	);
}

export function isPremiumPlus(user: any) {
	return (
		user?.is_premium_plus === 1 ||
		user?.is_admin === 1 ||
		user?.is_staff === 1 ||
		user?.is_tester === 1 ||
		user?.is_partner === 1 ||
		user?.is_retired === 1 ||
		user?.is_dev === 1 ||
		user?.is_manager === 1 ||
		user?.is_senior_tester ||
		user?.is_tester_manager ||
		user?.is_jr_admin ||
		user?.is_tech_support ||
		user?.is_senior_tech_support
	);
}

export function isAdmin(user: any) {
	return user?.is_admin === 1 || user?.is_jr_admin;
}

export function isMod(user: any) {
	return (
		user?.is_admin === 1 ||
		user?.is_staff === 1 ||
		user?.is_dev === 1 ||
		user?.is_manager === 1 ||
		user?.is_senior_tester ||
		user?.is_tester_manager ||
		user?.is_jr_admin ||
		user?.is_tech_support ||
		user?.is_senior_tech_support
	);
}

export function isTester(user: any) {
	return user.is_tester || user.is_tester_manager || user.is_senior_tester;
}
