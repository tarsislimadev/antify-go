package antify

import "os"
import "strings"
import uuid "github.com/brtmvdl/antify/uuid"

const SLASH = "/"

type Database struct {
	DataPath string
}

func (db Database) In(dataPath string) Database {
	return Database{
		DataPath: strings.Join([]string{db.DataPath, dataPath}, SLASH),
	}
}

func (db Database) New() DatabaseObject {
	obj := DatabaseObject{
		Database: db,
		Id: uuid.New(),
	}

	obj.CreatePath()

	return obj
}

func (db Database) ToString() string {
	return strings.Join([]string{
		db.DataPath,
	},LINE_BREAK)
}

type DatabaseObject struct {
	Database
	Id string
}

func (obj DatabaseObject) CreatePath() error {
	path := strings.Join([]string{obj.Database.DataPath, obj.Id}, SLASH)

	return os.MkdirAll(path, 0644)
}

func (obj DatabaseObject) WriteMany(props map[string][]byte) []error {
	errors := make([]error, 0)

	for key, value := range props {
		err := obj.Write(key, value)

		if err != nil {
			errors = append(errors, err)
		}
	}

	return errors
}

func (obj DatabaseObject) Write(name string, value []byte) error {
	return nil
}

func (obj DatabaseObject) ToString() string {
	return strings.Join([]string{
		obj.Database.DataPath,
		obj.Id,
	}, LINE_BREAK)
}

