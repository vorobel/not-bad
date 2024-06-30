import database from "../config/mysql.config.js";
import logger from "../utils/logger.js";
import QUERY from "../query/user.query.js";
import Response from "../domain/response.js";

const HttpStatus = {
  OK: {
    code: 200,
    status: "OK",
  },
  CREATED: {
    code: 201,
    status: "CREATED",
  },
  NO_CONTENT: {
    code: 204,
    status: "NO_CONTENT",
  },
  BAD_REQUEST: {
    code: 400,
    status: "BAD_REQUEST",
  },
  NOT_FOUND: {
    code: 404,
    status: "NOT_FOUND",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: "INTERNAL_SERVER_ERROR",
  },
};

export const getUsers = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching users`);
  database.query(QUERY.SELECT_USERS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No users found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Users retrieved",
            { users: results }
          )
        );
    }
  });
};

export const createUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating user`);
  database.query(
    QUERY.CREATE_USER,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              "Error occured while creating a user"
            )
          );
      } else {
        const user = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date(),
        };
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              "User created",
              { user }
            )
          );
      }
    }
  );
};

export const getUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching user`);
  database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `User by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "User retieved",
            results[0]
          )
        );
    }
  });
};

export const updateUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching user`);
  database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `User by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating user`);
      database.query(
        QUERY.UPDATE_USER,
        [Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res.status(HttpStatus.OK.code).send(
              new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                "User updated",
                {
                  id: req.parapms.id,
                  ...req.body,
                }
              )
            );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `User by id ${req.params.id} was not updated`
                )
              );
          }
        }
      );
    }
  });
};

export const deleteUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting user`);
  database.query(QUERY.DELETE_USER, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "User deleted",
            results[0]
          )
        );
    } else {
              res
                .status(HttpStatus.NOT_FOUND.code)
                .send(
                  new Response(
                    HttpStatus.NOT_FOUND.code,
                    HttpStatus.NOT_FOUND.status,
                    `User by id ${req.params.id} was not found`
                  )
                );
    }
  });
};

export default HttpStatus;
