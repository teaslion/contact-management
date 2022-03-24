import express, { Request, Response } from "express";
import { Validator } from "node-input-validator";
import path from "path";
import fs from "fs";
import multer from "multer";
import { uuid } from "uuidv4";
import Contact from "../models/Contact.model";

import { ValidationError, __error, readFile, writeFile } from "../utils";

const upload = multer({ dest: "assets/" });

const router = express.Router();

router.route("/ping").get((req: Request, res: Response) => {
  res.status(200).send("Hi from server");
  // const validator = new Validator(req.query, {
  //   sentence: "required|string|minLength:2",
  // });
  // return validator
  //   .check()
  //   .then((matched) => {
  //     if (!matched) throw new ValidationError(validator.errors);
  //     return reverseWords(req.query.sentence as string);
  //   })
  //   .then((reversed) => res.status(200).json(reversed))
  //   .catch((error) => __error(res, error));
});

router.post("/", upload.single("avatarFile"), (req: Request, res: Response) => {
  return Promise.resolve()
    .then(() => {
      const contact = Contact.build({
        ...req.body,
        owner: "0x0A92DD7B30f0f57343AD99a151dBC37a3F3F95F3",
      });

      if (req.file) {
        const ext = req.file.originalname.split(".").pop();
        const filename = `${uuid()}.${ext}`;
        fs.renameSync(req.file.path, `assets/${filename}`);

        const domain = `${req.protocol}://${req.get("host")}`;
        contact.avatar = `${domain}/${filename}`;
      }

      return contact.save();
    })
    .then((contact) =>
      res.json({
        status: true,
        message: "Contact created successfully!",
        data: contact,
      })
    )
    .catch((error) => __error(res, error));
});

router.get("/:id", (req: Request, res: Response) => {
  return Contact.findOne({
    where: { id: req.params.id },
  }).then((contact) => res.json(contact));
});

router.get("/", (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  return Contact.findAll({
    limit,
    offset,
  })
    .then((contacts) =>
      res.json({ status: true, message: "success", data: contacts })
    )
    .catch((error) => __error(res, error));
});

export default router;
