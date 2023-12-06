higiKioskUi.factory('fireStore', ['$http', '$q', function($http, $q) {
    var fireStore = {};
   
	var db = firebase.firestore();
	// var fireStoreRef = db.collection('/users');
    var fireStoreRef;

    fireStore.getAll = function(collectionName) {
        fireStoreRef = db.collection(collectionName);
        return fireStoreRef;
    }

    fireStore.getDocumentByID = function(id, collectionName) {
        fireStoreRef = db.collection(collectionName);
        return fireStoreRef.doc(id);
    }

    fireStore.create = function(id, collectionName, event) {
        fireStoreRef = db.collection(collectionName);
        return fireStoreRef.doc(id).set({ ...event });
        //return fireStoreRef.add(event);
    }

	fireStore.update = function(id, collectionName, data) {
        fireStoreRef = db.collection(collectionName);
        return fireStoreRef.doc(id).update(data);
    } 

    fireStore.delete = function(id, collectionName) {
        fireStoreRef = db.collection(collectionName);
        return fireStoreRef.doc(id).delete();
    }
    return fireStore;
}])