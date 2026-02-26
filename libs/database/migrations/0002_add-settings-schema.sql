CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`budget_type` text NOT NULL,
	`currency` text NOT NULL,
	`goal` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
