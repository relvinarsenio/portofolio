export type Theme = 'system' | 'light' | 'dark';

class ThemeState {
	theme = $state<Theme>('system');
	isDark = $state<boolean>(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.theme = (localStorage.getItem('theme') as Theme) || 'system';
			this.updateDOM();

			// Listen for system preference changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
				if (this.theme === 'system') {
					this.updateDOM();
				}
			});
		}
	}

	setTheme(newTheme: Theme) {
		this.theme = newTheme;
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
			this.updateDOM();
		}
	}

	cycleTheme() {
		const order: Theme[] = ['system', 'light', 'dark'];
		const nextIdx = (order.indexOf(this.theme) + 1) % order.length;
		this.setTheme(order[nextIdx]);
	}

	private updateDOM() {
		if (typeof window === 'undefined') return;
		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const shouldBeDark = this.theme === 'dark' || (this.theme === 'system' && systemDark);

		this.isDark = shouldBeDark;
		if (shouldBeDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
}

export const themeStore = new ThemeState();
