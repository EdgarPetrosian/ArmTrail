import Foundation

// Define the custom annotations property with the correct type
public var annotations: [String: Any?] {
    idsByView.compactMapValues { [mapboxMap] id in
        try? mapboxMap.options(forViewAnnotationWithId: id)
    }
}
