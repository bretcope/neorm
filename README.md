# Neorm

___Nothing to see here yet...___

The purpose of this project will be to write a [Neo4j](http://www.neo4j.org/) [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping) for [Node.js](http://nodejs.org/) with syntax inspired by [Mongoose](http://mongoosejs.com/).

The guiding principle of the Neorm project will be to assist users in managing the schema of their Neo4j graphs, nothing more. We should not be opinionated about how users chose to utilize Neo4j features. There should be simple, understandable, helper functions which make trivial interactions with the graph easier, but Cypher queries are incredibly powerful and we should embolden users to write and execute them. There is no possible way we could abstract away every use case for every user, so let's not try.

Let me reiterate, in it's current state, ___Neorm is not even remotely useable as a library or ORM yet___. There is no roadmap yet, other than to say this is something I've been thinking about for a while and now I finally need it in order to build another project I'm working on. So hopefully there will be some progress in the near future.

## Contributing

If you're interested in contributing to the project, contact me through my github profile, or open an issue in the issue tracker.

## Relation to Neo4j-js

A lot has changed in the eight months since I wrote [neo4j-js](https://github.com/bretcope/neo4j-js). I have a much better understanding of Neo4j, and how people might want to interact with it than I did back then (I had no prior Neo4j experience). Neo4j itself is nearing version 2.0 and there are a lot of very cool features which are coming with it. The most important of which, from my perspective, is node labels. Labels allow for better schema organization and much better automatic indexing.

Neo4j-js was built around the REST API. All of its features have a nearly one-to-one correlation with a REST endpoint. While that wasn't necessarily the wrong way to design the library at that time, it has made it difficult to incorporate new features (like labels and transactions) into the library without feeling like complete afterthoughts (which is why those features still don't exist in neo4j-js, and probably never will). Neorm will not focus on the REST API at all; instead, it will focus on data models and cypher queries.