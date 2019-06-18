const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

const Emblem = mongoose.model("emblem");
const EmblemType = require("./emblem_type")

const Abode = mongoose.model("abode");
const AbodeType = require("./abode_type")

// this will be the where we will create all of the mutations for our application
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      // we are naming our filed - and therefore our mutation `newGod`
      newGod: {
        // we just specify the type we are mutating - in the case of making
        // a new God this will be the GodType
        type: GodType,
        args: {
          // the arguments required for this mutation
          name: { type: GraphQLString },
          type: { type: GraphQLString },
          description: { type: GraphQLString }
        },
        // here we are just destructing our arguments
        resolve(parentValue, { name, type, description }) {
          return new God({ name, type, description }).save();
        }
      },
      deleteGod: {
          type: GodType,
          args: {
              id: {type: GraphQLID}
          },
          resolve(parentValue, { id } ){
              return God.findByIdAndDelete(id)
          }
      },
      //updateGod
      updateGod: {
            type: GodType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                description: { type: GraphQLString }
            },
        resolve(parentValue, { id, name, type, description }) {
            const updateObj = {};
    
            if (id) updateObj.id = id;
            if (name) updateObj.name = name;
            if (type) updateObj.type = type;
            if (description) updateObj.description = description;
  
            return God.findOneAndUpdate(
                { _id: id },
                { $set: updateObj },
                { new: true },
                (err, god) => {
                    return god;
                }
            );
        }
      },
      addGodRelative: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            relativeId: { type: GraphQLID },
            relationship: { type: GraphQLString }
        },
        resolve(parentValue, { godId, relativeId, relationship }) {
            return God.addRelative(godId, relativeId, relationship);
        }
      },
      removeGodRelative: {
        type: GodType,
        args: {
          godId: { type: GraphQLID },
          relativeId: { type: GraphQLID },
          relationship: { type: GraphQLString }
        },
        resolve(parentValue, { godId, relativeId, relationship }) {
          return God.removeRelative(godId, relativeId, relationship);
        }
      },
      // emblem mutation
      addGodEmblem :{
          type: GodType,
          args: {
              godId: { type: GraphQLID},
              emblemId: {type: GraphQLID}
          },
          resolve(parentValue, { godId, emblemId }) {
              return God.addEmblem(godId, emblemId);
          }
      },
      removeGodEmblem: {
        type: GodType,
        args: {
            godId: { type: GraphQLID},
            emblemId: {type: GraphQLID}
        },
        resolve(parentValue, { godId, emblemId }) {
            return God.removeEmblem(godId, emblemId);
        }
      },
      updateGodAbode: {
        type: GodType,
        args: {
            godId: { type: GraphQLID},
            abodeId: {type: GraphQLID}
        },
        resolve(parentValue, { godId, abodeId }) {
            return God.updateAbode(godId, abodeId);
        }
      },
      //domain
      addGodDomain: {
        type: GodType,
        args: {
          godId: { type: GraphQLID },
          domain: { type: GraphQLString }
        },
        resolve(parentValue, { godId, domain }) {
          return God.addDomain(godId, domain);
        }
      },
      removeGodDomain: {
        type: GodType,
        args: {
          godId: { type: GraphQLID },
          domain: { type: GraphQLString }
        },
        resolve(parentValue, { godId, domain }) {
          return God.removeDomain(godId, domain);
        }
      },
      //
      newAbode: {
        type: AbodeType,
        args: {
          // the arguments required for this mutation
          name: { type: GraphQLString },
          coordinates: { type: GraphQLString }
        },
        // here we are just destructing our arguments
        resolve(parentValue, { name, coordinates }) {
          return new Abode({ name, coordinates }).save();
        }
      },
      deleteAbode: {
        type: AbodeType,
        args: {
            id: {type: GraphQLID}
        },
        resolve(parentValue, { id } ){
            return Abode.findByIdAndDelete(id)
        }
     },
     updateAbode: {
        type: AbodeType,
        args: {
          id: { type: GraphQLID },
          name: { type: GraphQLString }
        },
        resolve(parentValue, { id, name }) {
          return Abode.findOneAndUpdate(
            { _id: id },
            { $set: { name } },
            { new: true },
            (err, abode) => {
              return abode;
            }
          );
        }
      },
      //emblem
      newEmblem: {
        type: EmblemType,
        args: {
          // the arguments required for this mutation
          name: { type: GraphQLString }
        },
        // here we are just destructing our arguments
        resolve(parentValue, { name }) {
          return new Emblem({ name }).save();
        }
      },
      deleteEmblem: {
        type: EmblemType,
        args: {
            id: {type: GraphQLID}
        },
        resolve(parentValue, { id } ){
            return Emblem.findByIdAndDelete(id)
        }
     },
     updateEmblem: {
        type: EmblemType,
        args: {
          id: { type: GraphQLID },
          name: { type: GraphQLString }
        },
        resolve(parentValue, { id, name }) {
          return Emblem.findOneAndUpdate(
            { _id: id },
            { $set: { name } },
            { new: true },
            (err, emblem) => {
              return emblem;
            }
          );
        }
      },
    }
  });

module.exports = mutation;