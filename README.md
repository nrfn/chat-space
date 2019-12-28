# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル------------------------------------
|Column|Type|Options|
|------|----|-------|
|name|Text|null:false;|
|pass|Text|unique: turue, null: false;|
|email|Text|null: false;|
### Association
- has_many : groups :through: :groups_users
- has_many : chats

## groups_usersテーブル-------------------------------
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル--------------------------------------
|Column|Type|Options|
|group_name|text|null: false;
|user_id|integer|null: false;
### Association
- has_many : users :through: :groups_users
- has_many : chats

## chatテーブル----------------------------------------
|Column|Type|Options|
|user_id|integer|null: false;|
|group_id|integer|
|text|text|null: false;|
### Association
belongs_to : user
belongs_to : group