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


## usersテーブル------------------------------------
|Column|Type|Options|
|------|----|-------|
|name|Text|null:false;|
|pass|Text|null: false;|
### Association
- has_many : groups :through: :groups_users
- has_many : chats
- has_many : groups_users

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
### Association
- has_many : users :through: :groups_users
- has_many : chats
- has_many : groups_users

## chatsテーブル----------------------------------------
|Column|Type|Options|
|chat|text|null: false;|
|pic|image|
### Association
belongs_to : user
belongs_to : group