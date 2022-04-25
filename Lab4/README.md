## Run Task 1:

Navigate to activity1 directory

npm install

npm start

### Testing

- Get stories with filter:

  - Add the filter specifications as query parameters in GET request to /stories. These include:

        - author
        - title
        - startDate
        - endDate

    Examples:

        - http://localhost:3001/stories?author=i&title=e&startDate=01-01-2018
        - http://localhost:3001/stories?author=i&title=e
        - http://localhost:3001/stories?title=e&endDate=01-01-2018

- Add Story:

  - POST request in application/x-www-url-encoded form. Returns JSON response Endpoint is /addStory and body includes:

    - title: title of new story
    - author: author of new story
    - public: public flag of new story
    - content: content of new story

    Example:

        - http://localhost:3001/addStory

    See postman collection for working examples

- Update Headline:

  - POST request in application/x-www-url-encoded form. Returns JSON response Endpoint is /updateHeadline and body includes:

    - headline: new headline of story
    - selected: index of story in file to be updated

    Example:

        - http://localhost:3001/updateHeadline

    See postman collection for working examples

- Update Content:

  - POST request in application/x-www-url-encoded form. Returns JSON response Endpoint is /updateContent and body includes:

    - content: new content of story
    - selected: index of story in file to be updated

    Example:

        - http://localhost:3001/updateContent

    See postman collection for working examples

- Delete Story:

  - POST request in application/x-www-url-encoded form. Returns JSON response Endpoint is /deleteStory and body includes:

    - selected: index of story in file to be deleted

    Example:

        - http://localhost:3001/updateContent

    See postman collection for working examples

## Run Task 2:

Navigate to activity2 directory

npm install

npm start

## Run Task 3 :

Navigate to activity3 directory

npm install

npm start

#

### Notes:

- Task 1 runs on port 3001
- Task 2 runs on port 3002
- Task 3 runs on port 3003
- All requirements complete except R4 on activity 3
