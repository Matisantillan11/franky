CREATE TABLE `monthly_budget` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
