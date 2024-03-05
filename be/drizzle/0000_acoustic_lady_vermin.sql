CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`original_url` text,
	`short_url` text,
	`created_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`created_at` text
);
